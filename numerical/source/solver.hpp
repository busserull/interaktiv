#ifndef SOLVER_HPP
#define SOLVER_HPP
#include "types.hpp"
#include "dormand_prince_54.hpp"

class Solver {
    public:
        Solver();

        Solver(
            Plant plant,
            Vecd x_init,
            double time_init = 0.0,
            double local_tolerance = 1.0e-10,
            Integrator integrator = dormand_prince_54,
            unsigned int integrator_order = 5
        );

        void advance(
            const double to_time,
            const Vecd & u
        );

        double get_t() const {
            return t;
        }

        const Vecd & get_x() const {
            return x;
        }

    private:
        double error_max_abs();

        void adjust_step_length();

        Integrator integrator;
        double adaptive_denominator;

        Plant plant;
        Vecd x;

        double t;
        double h;

        Vecd x_step;

        double local_tolerance;
        double max_error;
        double min_error;
        Vecd error_estimates;
};

#endif
