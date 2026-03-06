function addworkout() {
   let table = document.getElementById("worktable");

        let work = document.getElementById("work").value
        let duration = document.getElementById("duration").value
        let burned = Number(document.getElementById("burned").value)

        let error1 = document.getElementById("error1");

        let namepattern = /^[a-zA-Z\s]+$/;  
        if (!namepattern.test(work)) {
            error1.textContent = "letters only";
            return;
        }
        
        let numberpattern = /^\d+$/;
        if (!numberpattern.test(duration) || !numberpattern.test(burned)) {
            error1.textContent = "numbers only";
            return;
        }

    table.innerHTML += `
    <tr>
        <td>${work}</td>
        <td>${duration}</td>
        <td>${burned}</td>
            <td class="deletecell"><button onclick="deleteWorkout(this)" class="deletebtn">❌</button></td>
    </tr>
    `

    let totalburned = document.getElementById("totalburned");
    let currentburned = Number(totalburned.textContent);
    totalburned.textContent = currentburned + burned;

    calculateNetCalories();
}

function addfood() {
    let table = document.getElementById("foodtable");

    let food = document.getElementById("food").value;
    let consumed = document.getElementById("consumed").value;

    let error2 = document.getElementById("error2");

     let namepattern = /^[a-zA-Z\s]+$/;  
        if (!namepattern.test(food)) {
            error2.textContent = "letters only";
            return;
        }
        
        let numberpattern = /^\d+$/;
        if (!numberpattern.test(consumed)) {
            error2.textContent = "numbers only";
            return;
        }


    table.innerHTML += `
        <tr>
            <td>${food}</td>
            <td>${consumed}</td>
            <td class="deletecell"><button onclick="deleteFood(this)" class="deletebtn">❌</button></td>
        </tr>
    `




    let totalconsumed = document.getElementById("totalconsumed");
    let currentconsumed = Number(totalconsumed.textContent);
    totalconsumed.textContent = currentconsumed + Number(consumed);

    calculateNetCalories();

}

function calculateNetCalories() {
    let totalconsumed = Number(document.getElementById("totalconsumed").textContent);
    let totalburned = Number(document.getElementById("totalburned").textContent);
    let netcalories = document.getElementById("netcalories");
    netcalories.textContent = totalconsumed - totalburned;
    let progress = document.getElementById("progress");
    if (totalconsumed > totalburned) {
        progress.textContent = "Surplus";
    } else if (totalconsumed < totalburned) {
        progress.textContent = "Deficit";
    } else {
        progress.textContent = "Balanced";
    }

   
}

livedate = new Date();
 let options = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

document.querySelector(".date").textContent = livedate.toLocaleDateString("en-IN", options);

deleteFood = (button) => {
    let row = button.parentNode.parentNode;
    let consumed = Number(row.children[1].textContent); 
    let totalconsumed = document.getElementById("totalconsumed");
    let currentconsumed = Number(totalconsumed.textContent);
    totalconsumed.textContent = currentconsumed - consumed; 
    row.remove();
    calculateNetCalories();
} 

deleteWorkout = (button) => {   
    let row = button.parentNode.parentNode;
    let burned = Number(row.children[2].textContent); 
    let totalburned = document.getElementById("totalburned");
    let currentburned = Number(totalburned.textContent);
    totalburned.textContent = currentburned - burned; 
    row.remove();
    calculateNetCalories();
} 