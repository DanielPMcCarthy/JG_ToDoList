
// GET ELEMENTS
var taskInput=document.getElementById("new-task"); //Add a new task.
var addButton=document.getElementsByTagName("button")[0]; // ADD Button
var incompleteTaskHolder=document.getElementById("incomplete-tasks"); // <ul> #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks"); // completed-tasks


//New Item 
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	// Append Each Element
	checkBox.type="checkbox";
	editInput.type="text";

  // Edit Button
	editButton.innerText="Edit";
  editButton.className="edit";
  
  // Delete Button
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	// Appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}
  
// Create A New List Item From The Input Box
var addTask=function(){
  console.log("Add Task...");
  
	var listItem=createNewTaskElement(taskInput.value);

	// Append listItem From Input Box To #incomplete-tasks
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

// Edit #incomplete-tasks
var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If Parent Class = .editmode
		if(containsClass){

		// The Label Becomes Input Value
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		// Toggle .editmode On Parent
		listItem.classList.toggle("editMode");
}

// Delete A Task
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		// Remove Parent <li> From <ul>
		ul.removeChild(listItem);

}

// Mark Task Completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	// Append Task <li> to #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
		console.log("Incomplete Task...");

    var listItem=this.parentNode;
	    incompleteTaskHolder.appendChild(listItem);
			  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
	console.log("AJAX Request");
}

// Set Click Handler To addTask Function
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
// Select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

// Loop Over incompleteTaskHolder <ul> <li>
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		// Bind Events To <li> chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

// Loop Over completedTasksHolder <ul> <li> 
	for (var i=0; i<completedTasksHolder.children.length;i++){
  
    // Bind Events To <li> chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}