var element = document.querySelector('.card-container');

var scalable = new Scalable(element, {
    align: 'center',
    verticalAlign: 'center'
});


$( function() {
    $( "#resizable" ).resizable();
} );