var a; 
var storeName = 'students';
var key = ['id','name','age','email'];
var tableRecord = document.getElementById('tableRecord');
// var recordFound = false;



window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
         
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}






// function renderTable(readAllData(storeName)){
//      tableRecord.innerHTML = '';
    
//         var tr= document.createElement('tr');
//         key.forEach(element => {
//             var td = document.createElement('td');
//             td.innerText = cursor.value[element];
//             tr.appendChild(td);                    
//         });
//          tableRecord.appendChild(tr);
//          cursor.continue();
//       }

var db;
function init(){
var request = window.indexedDB.open("studentDatabase", 1);

request.onerror = function(event) {
   errorMsgShow("error: database not created");
};

request.onsuccess = function(event) {
   db = request.result;
   errorMsgShow("success: "+ db);
};

request.onupgradeneeded = function(event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore(storeName, {keyPath: "id"}); 
// objectStore.createIndex('','');
   console.log('update');
}



}

init();

function read() {
   var transaction = db.transaction(storeName);
   var objectStore = transaction.objectStore(storeName);
   var request = objectStore.get(parseInt(inputId.value.trim()));
   
   request.onerror = function(event) {
      alert("Unable to retrieve data from database!");
   };
   
   request.onsuccess = function(event) {
     
      if(request.result) {
          inputName.value = request.result.name;
          inputAge.value = request.result.age;
          inputEmail.value = request.result.email;
           deleteBtn.addEventListener('click',remove);
           editBtn.addEventListener('click',edit);
           //console.log('assign event to delete btn');

         // recordFound = true;
//         alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
      }
      else {
         errorMsgShow("couldn't be found in your database!");
      }
   };
 
}

function readAll() {
   var objectStore = db.transaction(storeName).objectStore(storeName);
   
   tableRecord.innerHTML = '';
  
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var tr= document.createElement('tr');
        key.forEach(element => {
            var td = document.createElement('td');
            td.innerText = cursor.value[element];
            tr.appendChild(td);                    
        });
         tableRecord.appendChild(tr);
         cursor.continue();
      }
   };
}



function add() {
 if (validation(inputId.value.trim(),inputName.value,inputAge.value,inputEmail.value) == true)
 {
   var request = db.transaction(storeName, "readwrite")
   .objectStore(storeName)
   .add({ id: parseInt(inputId.value.trim()), name: inputName.value, age: inputAge.value, email: inputEmail.value });

   request.onsuccess = function(event) {
    clearInputFields();
    errorMsgShow("Record has been added to your database.");  
   };
   
   request.onerror = function(event) {
     errorMsgShow("Unable to add data. This id is aready exist in your database! ") ;
   };
}
}

function remove() {
   var request = db.transaction(storeName, "readwrite")
   .objectStore(storeName).openCursor().onsuccess = function(event) {
      
      var cursor = event.target.result;
      if (cursor) {
          if (cursor.value.id == parseInt(inputId.value.trim()))
          {          
            console.log(cursor.value.id);
            var request = cursor.delete();  
            request.onsuccess = function() {
            // deleteRecordFlag = true;
            errorMsgShow( inputId.value +" entry has been removed from your database.");
            clearInputFields();
            deleteBtn.removeEventListener('click',remove);
            };
            request.onerror = function(){
              console.log('not found'+cursor.value.id);
            };
          }
        else
        {
        cursor.continue();
        } 
     }
   };
  
  
  }


function edit() {
    enableInputFields();
 var request = db.transaction(storeName, "readwrite")
   .objectStore(storeName).openCursor().onsuccess = function(event) {
      
      var cursor = event.target.result;
      if (cursor) {
          if (cursor.value.id == parseInt(inputId.value.trim()))
          {          
              var updateData = cursor.value;
            console.log(cursor.value.id);
            updateData.name = inputName.value;
            updateData.age = inputAge.value;
            updateData.email = inputEmail.value;
            if (validation(inputId.value.trim(),inputName.value,inputAge.value,inputEmail.value) == true)
            {
            var request = cursor.update(updateData);  
            request.onsuccess = function() {
            errorMsgShow( " Entry has been updated in your database.");
            clearInputFields();
            editBtn.removeEventListener('click',edit);
            }
            };
            request.onerror = function(){
              console.log('not found'+cursor.value.id);
            };
          }
        else
        {
        cursor.continue();
        } 
     }
   };
 
}
 
function searchEdit(){
    read();
    enableInputFields();
}


function searchDelete (){
    read();
}


function validation(stdId,stdName,stdAge,stdEmail)
{
    var validationFlag = true;
   var error= '';
    if (stdId == '')
    {
        validationFlag = false;
       error +="Student ID must not be left Blank. \n";
        
    }

    if (stdName == '')
    {
        validationFlag = false;
        error +="Student Name must not be left Blank. \n";
    }

    if (stdAge =='')
    {
        validationFlag = false;
        error +="Age must not be  left Blank \n";
    }
    if (stdEmail =='')
    {
        validationFlag = false;
        error +="Email must not be left Blank";
    }
    errorMsgShow(error);
    return validationFlag;
}