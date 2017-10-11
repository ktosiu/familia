var reverse_relarion = function(relation){
	switch(relation){
		case "dad" :
		case "mom" :
			return "child";
			break;
		case "daughter" :
		case "son" :
			return "parent";
			break;
		case "brother" :
		case "sister" :
			return "parent";
			break;
		case "wife" :
			return "husband";
			break;
		case "husband" :
			return "wife";
			break;
		default:
			return "";
			break;
	}
}


$('.remove-house').on('click', function(e){
	e.preventDefault();
	let house_id = $(this).data('house-id');
	alert(house_id);
	$.ajax({
		type: "DELETE",
		url: '/api/houses/' + house_id,
		contentType: false,
		success: function(data, status, xhr){
			if(xhr.status == 200){
				window.location = "/houses/list";
			}
		}
	});
});