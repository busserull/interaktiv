#include "types.hpp"
#include "dormand_prince_54.hpp"

static void weighted_sum(
        const Vecd &x_init, const Vecd * p_butcher_k,
        const double * p_butcher_weights, Vecd &out
    ){
    for(int dim = 0; dim < static_cast<int>(x_init.size()); dim++){
        out[dim] = x_init[dim];
        for(int i = 0; i < 7; i++){
            out[dim] += p_butcher_weights[i] * p_butcher_k[i][dim];
        }
    }
}

void dormand_prince_54(
        const Plant plant,
        const double t,
        const Vecd & x_init,
        const Vecd & u,
        const double h,
        Vecd & x_out,
        Vecd & error_out
    ){
    static const double butcher_c[7] = {
        0.0, 1.0/5.0, 3.0/10.0, 4.0/5.0, 8.0/9.0, 1.0, 1.0
    };
    static const double butcher_a[7][7] = {
        {0.0},
        {1.0/5.0},
        {3.0/40.0, 9.0/40.0},
        {44.0/45.0, -56.0/15.0, 32.0/9.0},
        {19372.0/6561.0, -25360.0/2187.0, 64448.0/6561.0, -212.0/729.0},
        {9017.0/3168, -355.0/33, 46732.0/5247, 49.0/176, -5103.0/18656},
        {35.0/384, 0.0, 500.0/1113, 125.0/192, -2187.0/6784, 11.0/84}
    };
    static const double * butcher_b = butcher_a[6];
    static const double butcher_e[7] = {
        71.0/57600.0, 0.0, -71.0/16695.0, 71.0/1920.0,
        -17253.0/339200.0, 22.0/525.0, -1.0/40.0
    };
    static Vecd butcher_k[7];

    int dimension = x_init.size();
    for(int i = 0; i < 7; i++){
        butcher_k[i] = Vecd(dimension);
    }
    Vecd f(dimension);
    Vecd x_shift(dimension);

    for(int step = 0; step < 7; step++){
        weighted_sum(x_init, butcher_k, butcher_a[step], x_shift);
        plant(t + butcher_c[step] * h, x_shift, u, f);

        for(int i = 0; i < dimension; i++){
            butcher_k[step][i] = h * f[i];
        }
    }

    x_out = Vecd(dimension, 0.0);
    weighted_sum(x_init, butcher_k, butcher_b, x_out);

    error_out = Vecd(dimension, 0.0);
    weighted_sum(error_out, butcher_k, butcher_e, error_out);
}
