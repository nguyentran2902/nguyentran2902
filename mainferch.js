// _________________________

$(document).ready(function() {
    $('#dtBasicExample').DataTable();;
});


//   ______________________________________

var ObjectApi = 'http://localhost:3000/object';

// ______________________________


function getObjects(callback) {
    fetch(ObjectApi)
        .then(function(response) {
            return response.json();
        })

    .then(callback)
};

function addObjects(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(ObjectApi, options)
        .then(function(response) {
            return response.json();
        })

    .then(callback)
};

function fixObject(data, id, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    };
    fetch(ObjectApi + "/" + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback)

}



function deleteObject(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },


    };
    fetch(ObjectApi + "/" + id, options)
        .then(function(response) {
            return response.json();
        })

    .then(function() {
        var objectItem = document.querySelector('.object-item-' + id)
        if (objectItem) {
            objectItem.innerHTML.remove()
        }
    })
};




function renderObject(objects) {
    var content = document.getElementById('content');
    var htmls = objects.map(function(object) {
        return `
        <tr class="object-item-${object.id}">
        <th scope="row">${object.id}</th>
        <td class="object-name-${object.id}">${object.name}</td>
        <td class="object-teacher-${object.id}">${object.teacher}</td>
        <td scope="col">
                <div onclick="handlefixObject(${object.id})" class="btn-group" role="group">
                      <button type="button" class="btn btn-info">Sửa</button>
                  </div>
                <div onclick="deleteObject(${object.id})" class="btn-group" role="group">
                    <button type="button" class="btn btn-danger">Xóa</button>
              </div>
         </td>
         </tr>
        `
    });
    content.innerHTML = htmls.join('')

}

function CreateObject() {
    var createBtn = document.querySelector('.create')
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var teacher = document.querySelector('input[name="teacher"]').value

        var formData = {
            name: name,
            teacher: teacher,
        }

        addObjects(formData, function() {
            getObjects(renderObject)
        })

    }
}

function handlefixObject(id) {
    document.querySelector('.create').style.display = 'none';
    document.querySelector('.fix').style.display = 'inline-block';
    document.querySelector('input[name="name"]').value = document.querySelector('.object-name-' + id).innerHTML;
    document.querySelector('input[name="teacher"]').value = document.querySelector('.object-teacher-' + id).innerHTML;


    document.querySelector('.fix').onclick = function() {

        var data = {
            name: document.querySelector('input[name="name"]').value,
            teacher: document.querySelector('input[name="teacher"]').value
        }

        console.log(data)

        fixObject(data, id, function() {
            getObjects(renderObject)
        })

        document.querySelector('.create').style.display = 'inline-block';
        document.querySelector('.fix').style.display = 'none';
    }

};





// ____________________________

function start() {
    getObjects(renderObject)
    CreateObject()
};

start();