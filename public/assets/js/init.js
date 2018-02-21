var btnRead = document.getElementById('btnRead');
var btnReadAll = document.getElementById('btnReadAll');
var btnAdd = document.getElementById('btnAdd');
var btnRemove = document.getElementById('btnRemove');
var btnEdit = document.getElementById('btnEdit');
var btnBack = document.getElementById('btnBack');

var mainPage = document.getElementById('mainPage');
var addPage = document.getElementById('addPage');
var tablePage = document.getElementById('tablePage');

var titleImg = document.getElementById('titleImg');
var titleText = document.getElementById('titleText');

var inputId = document.getElementById('inputId');
var inputName = document.getElementById('inputName');
var inputAge = document.getElementById('inputAge');
var inputEmail = document.getElementById('inputEmail');

var resetBtn = document.getElementById('resetBtn');
var saveBtn = document.getElementById('saveBtn');
var searchBtnEdit = document.getElementById('searchBtnEdit');
var editBtn = document.getElementById('editBtn');
var searchBtnDelete = document.getElementById('searchBtnDelete');
var deleteBtn = document.getElementById('deleteBtn');
var searchBtnRead = document.getElementById('searchBtnRead');

// var cancelBtn = document.getElementById('cancelBtn');

var errorDiv = document.getElementById('errorDiv');

var addBtnGroup = document.getElementById('addBtnGroup');
var editBtnGroup= document.getElementById('editBtnGroup');
var deleteBtnGroup = document.getElementById('deleteBtnGroup');
var readBtnGroup = document.getElementById('readBtnGroup');

// cancelBtn.addEventListener('click',function(event){
//     mainPageOn();
// });

function swRegister(){
    if ('serviceWorker' in navigator)
    {
        navigator.serviceWorker.register('/sms_sw.js')
        .then(function(){
            console.log('service Worker Registered.');
        }).catch(function (err){
            console.log(err);
        });
    }
    
    window.addEventListener('beforeinstallprompt',function(event){
        console.log('beforeinstallprompt fired');
        // event.preventDefault();
        // deferredPrompt = event;
        // return false;
    });
    
}

swRegister();


function activeBtnGroup(name){
    var btngrp = ['addBtnGroup','editBtnGroup','deleteBtnGroup','readBtnGroup'];
    btngrp.forEach(function(element){
        if (element != name)
        {
            eval(element).className = 'makeInvisible';
        }
        else
        {
            eval(element).className = '';
        }
    });
}

resetBtn.addEventListener('click',function(){
clearInputFields();
});

btnAdd.addEventListener('click',function(event){
    mainPageOff();
    clearInputFields();
    enableInputFields();
    activeBtnGroup('addBtnGroup');
    titleImg.src = './assets/img/add64.png';
    titleText.innerText = 'Student Registration Form';
    saveBtn.innerText = 'Save';
    saveBtn.addEventListener('click',add);
});

btnBack.addEventListener('click',function(event){
    mainPageOn();
    deleteEventsFromButtons();
});

btnRead.addEventListener('click',function(event){
mainPageOff();
clearInputFields();
disableInputFields();
activeBtnGroup('readBtnGroup');
titleImg.src = './assets/img/search64.png';
titleText.innerText = 'Student Search Form';
searchBtnRead.addEventListener('click',read);
});


btnReadAll.addEventListener('click',function(event){
tablePageOn();
// tableRecord.style.height = (window.screen.availHeight-200)+'px';
readAll();
});

btnEdit.addEventListener('click',function(event){
mainPageOff();
clearInputFields();
disableInputFields();
activeBtnGroup('editBtnGroup');
titleImg.src = './assets/img/edit64.png';
titleText.innerText = 'Student Updation Form';
searchBtnEdit.addEventListener('click',searchEdit);

//editBtn.addEventListener
});

btnRemove.addEventListener('click',function(event){
mainPageOff();
clearInputFields();
disableInputFields();
activeBtnGroup('deleteBtnGroup');
titleImg.src = './assets/img/remove64.png';
titleText.innerText = 'Student Remove Form';
searchBtnDelete.addEventListener('click',searchDelete);

});



function mainPageOff(){
    mainPage.style.display = 'none';    
    addPage.style.display = 'block';
    setTimeout(function(){
     addPage.style.transform = 'translateY(0)';
    },1);
    tablePage.style.display = 'none';
    btnBack.style.visibility = 'visible';     
}

function mainPageOn(){
    mainPage.style.display = 'block';
     addPage.style.transform = 'translateY(100vh)';    
    setTimeout(function(){
    addPage.style.display = 'none';
    },350);
     tablePage.style.transform = 'translateY(100vh)';    
    setTimeout(function(){
    tablePage.style.display = 'none';
    },350);
     tablePage.style.display = 'none';
    btnBack.style.visibility = 'hidden';     
}

function tablePageOn(){
    mainPage.style.display = 'none';
    addPage.style.display = 'none';
    tablePage.style.display = 'block';
    setTimeout(function(){
     tablePage.style.transform = 'translateY(0)';
    },1);
    btnBack.style.visibility = 'visible';     
    
}

function disableInputFields(){
inputAge.setAttribute('disabled','disabled');
inputName.setAttribute('disabled','disabled');
inputEmail.setAttribute('disabled','disabled');
}

function enableInputFields(){
    inputAge.removeAttribute('disabled');
    inputName.removeAttribute('disabled');
    inputEmail.removeAttribute('disabled');
    }
function clearInputFields(){
inputAge.value = '';
inputName.value = '';
inputEmail.value = '';
inputId.value ='';
}

function errorMsgShow(error)
{
errorDiv.innerText = error;
errorDiv.style.display = 'block';
setTimeout(function(){
    errorDiv.style.display = 'none';
},1000);
}

function deleteEventsFromButtons(){
     deleteBtn.removeEventListener('click',remove);
     
}