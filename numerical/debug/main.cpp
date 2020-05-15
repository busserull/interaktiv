#include <iostream>
#include "types.hpp"
#include "solver.hpp"
#include "dormand_prince_54.hpp"

#include <vector>
typedef std::vector<double> STLVecd;

void put_vec(const STLVecd & vec, const char * label){
    std::cout << label << " = [";

    int print_count = 0;
    for(STLVecd::const_iterator it = vec.cbegin(); it != vec.cend(); it++){
        std::cout << *it << ", ";

        if(++print_count == 10){
            std::cout << "..." << std::endl;
            print_count = 0;
        }
    }

    std::cout << "];" << std::endl;
}

static double m_m = 1.0;
static double m_d = 0.1;
static double m_k = 1.0;

void plant_mds(const double t, const Vecd & x, const Vecd & u, Vecd & x_dot){
    x_dot[0] = x[1];
    x_dot[1] = (-m_k * x[0] -m_d * x[1] + u[1]) / m_m;
}

int main(){
    Vecd x(2, 0.0);
    x[0] = 1.0;

    Solver solver(dormand_prince_54, 5);
    solver.solve_for(plant_mds, x, 0.0);

    STLVecd t_save;
    STLVecd x_save;

    while(solver.get_t() < 100.0){
        t_save.push_back(solver.get_t());
        x_save.push_back(solver.get_x()[0]);
        /* t_save.push_back(solver.get_x()[0]); */
        /* x_save.push_back(solver.get_x()[1]); */

        solver.advance(solver.get_t() + 0.01, Vecd(2, 0.0));
    }

    put_vec(t_save, "t");
    put_vec(x_save, "x");
    std::cout << "plot(t, x)" << std::endl;

    return 0;
}
