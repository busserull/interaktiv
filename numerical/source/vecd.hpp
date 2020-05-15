#ifndef VECD_HPP
#define VECD_HPP

#ifndef VECD_CONTAINER_MAX_SIZE
#define VECD_CONTAINER_MAX_SIZE 8
#endif

/* Simulate a std::vector<double> in an environment */
/* where true dynamic allocations are not possible */

class Vecd {
    public:
        Vecd(){
            vecd_size = 0;
        }

        Vecd(unsigned int size){
            vecd_size = size;
        }

        Vecd(unsigned int size, double value){
            vecd_size = size;

            for(unsigned int i = 0; i < size; i++){
                vecd_values[i] = value;
            }
        }

        unsigned int size() const {
            return vecd_size;
        }

        double & operator[](unsigned int index){
            return vecd_values[index];
        }

        const double & operator[](unsigned int index) const {
            return vecd_values[index];
        }

        double * begin() {
            return vecd_values;
        }

        double * end() {
            return vecd_values + vecd_size - 1;
        }

        const double * cbegin() const {
            return vecd_values;
        }

        const double * cend () const {
            return vecd_values + vecd_size - 1;
        }

    private:
        unsigned int vecd_size;
        double vecd_values[VECD_CONTAINER_MAX_SIZE];
};

#endif
