/**
 * Created by zhangheng on 2017/3/20.
 */
let renderIf = function(condition, content) {
	if (condition) {
		return content;
	} else {
		return null;
	}
}
let renderIfElse = function(condition, ifContent, elseContent) {
	if (condition) {
		return ifContent;
	} else {
		return elseContent;
	}
};

export {renderIf , renderIfElse}