SET var1=%RANDOM% 
docker build -t djmarret1992/tickes-portalpago:1.%var1% -f Dockerfile .