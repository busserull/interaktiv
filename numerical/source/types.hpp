#ifndef TYPES_HPP
#define TYPES_HPP
#include "vecd.hpp"

typedef void (* Plant)(
    const double t,
    const Vecd & x,
    const Vecd & u,
    Vecd & x_dot_out
);

typedef void (* Integrator)(
    const Plant plant,
    const double t,
    const Vecd & x_init,
    const Vecd & u,
    const double h,
    Vecd & x_out,
    Vecd & error_out
);

#endif
