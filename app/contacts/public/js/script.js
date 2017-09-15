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