#include "solver.hpp"

/* std::numeric_limits<double>::epsilon() */
#define SOLVER_MIN_ERROR 2.22044604925031308085e-16f
#define SOLVER_NUMERIC_TOLERANCE 1.0e-5
#define SOLVER_NATURAL_LOG_SAFE_LIMIT 15

namespace {
    double absolute_value(const double n){
        if(n < 0.0){
            return -n;
        }
        return n;
    }

    double e_raised(const double x){
        double est = 1.0;
        double last = 0.0;
        double tail = 1.0;
        unsigned int n = 0;

        while(absolute_value(est - last) > SOLVER_NUMERIC_TOLERANCE){
            n++;
            last = est;
            tail *= (x / n);
            est += tail;
        }

        return est;
    }

    double natural_log(const double x){
        double est = x;
        double last = 0.0;
        double raised;

        if(x > SOLVER_NATURAL_LOG_SAFE_LIMIT){
            est = SOLVER_NATURAL_LOG_SAFE_LIMIT;
        }

        while(absolute_value(est - last) > SOLVER_NUMERIC_TOLERANCE){
            last = est;
            raised = e_raised(last);
            est = last - 2 * ((raised - x) / (raised + x));
        }

        return est;
    }
}

Solver::Solver()
    :
    integrator(nullptr),
    plant(nullptr)
{}

Solver::Solver(
        Plant plant,
        Vecd x_init,
        double time_init,
        double local_tolerance,
        Integrator integrator,
        unsigned int integrator_order
    )
    :
    integrator(integrator),
    adaptive_denominator(1.0 + static_cast<double>(integrator_order)),
    plant(plant),
    x(x_init),
    t(time_init),
    h(1.0e-6),
    x_step(x_init.size(), 0.0),
    local_tolerance(local_tolerance),
    max_error(0.0),
    min_error(SOLVER_MIN_ERROR),
    error_estimates(x_init.size(), 0.0)
{}

void Solver::advance(const double to_time, const Vecd & u){
    if(to_time < t)
        return;

    while(t < to_time){
        do{
            max_error = error_max_abs();
            adjust_step_length();

            if(t + h > to_time){
                h = to_time - t;
            }

            integrator(plant, t, x, u, h, x_step, error_estimates);
        } while(max_error > local_tolerance);

        t += h;
        x = x_step;
    }
}

double Solver::error_max_abs(){
    double worst_offender = 0.0;

    double fabs_v;
    for(const double & v : error_estimates){
        fabs_v = absolute_value(v);
        if(fabs_v > worst_offender){
            worst_offender = fabs_v;
        }
    }

    return worst_offender;
}

void Solver::adjust_step_length(){
    if(max_error == 0.0){
        max_error = min_error;
    }

    double increase_factor = local_tolerance / max_error;

    h = h * e_raised(natural_log(increase_factor) / adaptive_denominator);
}
