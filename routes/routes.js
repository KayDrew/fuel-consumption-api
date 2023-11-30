
export default function routes(fuelConsumption){

    let message="";
    let ids=[];
async function home(req,res){

    ids=await fuelConsumption.vehicles(); 
req.flash("message",message);
    res.render("index",{ids,

    });

}

async function addVehicle(req,res){

    let description=req.body.description;
    let reg_number=req.body.regNumber;

  

    let result=await fuelConsumption.addVehicle(description,reg_number);

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

    res.render("vehicles",{vehicles,

    });
}


async function refuel(req,res){

    l

}

return{
    home,
    addVehicle,
    vehicles
}
}