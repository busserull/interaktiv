#include "../types.hpp"
#include "../solver.hpp"

extern Solver g_solver;
extern unsigned int g_force_dimension;

static Vecd m_u(g_force_dimension, 0.0);

#ifdef __cplusplus
extern "C" {
#endif

    double get_t(){
        return g_solver.get_t();
    }

    double get_x(int index){
        return g_solver.get_x()[index];
    }

    void set_u(int index, double value){
        m_u[index] = value;
    }

    void step_relative(double t_plus){
        g_solver.advance(g_solver.get_t() + t_plus, m_u);
    }

    void step_relative_with_force(double t_plus, double force){
        m_u[g_force_dimension - 1] = force;
        g_solver.advance(g_solver.get_t() + t_plus, m_u);
    }

    void step_absolute(double to_time){
        g_solver.advance(to_time, m_u);
    }

    void step_absolute_with_force(double to_time, double force){
        m_u[g_force_dimension - 1] = force;
        g_solver.advance(to_time, m_u);
    }

#ifdef __cplusplus
}
#endif
