#include "plant_common.hpp"

Solver g_solver;
unsigned int g_force_dimension = 2;

namespace {
    double m;
    double d;
    double k;
}

void plant(const double t, const Vecd & x, const Vecd & u, Vecd & x_dot){
    x_dot[0] = x[1];
    x_dot[1] = (-k * x[0] -d * x[1] + u[1]) / m;
}

#ifdef __cplusplus
extern "C" {
#endif

    void init(
        double mass,
        double damper,
        double spring,
        double init_position,
        double init_velocity
    ){
        m = mass;
        d = damper;
        k = spring;

        Vecd x_init(2, 0.0);
        x_init[0] = init_position;
        x_init[1] = init_velocity;

        g_solver = Solver(plant, x_init, 0.0);
    }

#ifdef __cplusplus
}
#endif
