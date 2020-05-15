#ifdef __cplusplus
extern "C" {
#endif

    void * memcpy(void * dest, const void * src, long unsigned int n){
        unsigned char * to = (unsigned char *)(dest);
        const unsigned char * from = (const unsigned char *)(src);

        for(long unsigned int i = 0; i < n; i++){
            to[i] = from[i];
        }

        return dest;
    }

    void * memset(void * s, int c, long unsigned int n){
        unsigned char * mem = (unsigned char *)(s);
        unsigned char b = (unsigned char)(c);

        for(long unsigned int i = 0; i < n; i++){
            mem[i] = b;
        }

        return s;
    }

#ifdef __cplusplus
}
#endif
