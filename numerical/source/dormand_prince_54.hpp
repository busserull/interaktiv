#ifndef DORMAND_PRINCE_5
#define DORMAND_PRINCE_5
#include "types.hpp"

/* Integrator of order 5 */

void dormand_prince_54(
    const Plant plant,
    const double t,
    const Vecd & x_init,
    const Vecd & u,
    const double h,
    Vecd & x_out,
    Vecd & error_out
);

#endif
