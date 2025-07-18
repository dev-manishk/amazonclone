class Car {
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }
    displayInfo(){
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, ${this.isTrunkOpen}`);
    }
    go(){
      
       if(this.speed > 200){
        this.speed = 200
       };
       if(this.isTrunkOpen === true){
         return;
       };

        this.speed += 5;
    }
    brake(){
       this.speed -= 5;

       if(this.speed < 0){
        this.speed = 0;
       }
    }
    openTrunk(){
        if(this.speed > 0){
            return;
        }
        this.isTrunkOpen = true;
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
}
const car1 = new Car({
    brand : 'Toyota',
    model : 'Corolla'
});
const car2 = new Car({
    brand : 'Tesla',
    model : 'Model 3'
});

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();