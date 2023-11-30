
export default function routes(fuelConsumption){

    let message="";
    let fuelMessage="";
    let ids=[];
async function home(req,res){
    message="";
    ids=await fuelConsumption.vehicles(); 
req.flash("message",message);
req.flash("fuel",fuelMessage)
    res.render("index",{ids,

    });

}

async function addVehicle(req,res){
  
    let description=req.body.description;
    let reg_number=req.body.regNumber;
    let result=await fuelConsumption.addVehicle({description:description,regNumber:reg_number});

    if(result.message){
        message=result.message;
    }
    else{
        message="Sucessfuly added new vehicle";
    }


    res.redirect("/");
 

}



async function vehicles(req,res){

    let vehicles= await fuelConsumption.vehicles();
    console.log(vehicles);
    res.render("vehicles",{vehicles,

    });
}


async function refuel(req,res){

    let id=req.body.id;
    let liters=req.body.liters;
    let amount= req.body.amount;
    let distance=req.body.distance;
    let isFull= req.body.filled;
    let filled= isFull=="Yes"? true:false;
    let vehicle_id=Number(id);

let result= await fuelConsumption.refuel(vehicle_id,liters,amount,distance,filled);

result.status=="success"? fuelMessage="Successfully updated":fuelMessage=result.message;
console.log(result);
res.redirect("/");


}

return{
    home,
    addVehicle,
    vehicles,
    refuel
}
}