#include "plant_common.hpp"

Solver g_solver;
unsigned int g_force_dimension = 2;

namespace {
    double rho_A;
    double h_max;
}

void plant(const double t, const Vecd & x, const Vecd & u, Vecd & x_dot){
    x_dot[0] = (-x[0] * u[0] + u[1]) / rho_A;

    if(x[0] >= h_max && x_dot[0] > 0.0)
        x_dot[0] = 0.0;
}

#ifdef __cplusplus
extern "C" {
#endif

    void init(
        double density,
        double tank_area,
        double tank_max_height,
        double tank_level
    ){
        rho_A = density * tank_area;
        h_max = tank_max_height;

        Vecd x_init(1, 0.0);
        x_init[0] = tank_level;

        g_solver = Solver(plant, x_init, 0.0);
    }

#ifdef __cplusplus
}
#endif
