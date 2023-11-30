
export default function routes(fuelConsumption){

    let message="";
async function home(req,res){

    
req.flash("message",message);
    res.render("index");

}

async function addVehicle(req,res){

    let description=req.body.description;
    let reg_number=req.body.regNumber;

    console.log(description+reg_number)

    res.redirect("/");

}

return{
    home,
    addVehicle,
}
}