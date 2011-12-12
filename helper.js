/**
 * @author Ezra Velazquez
 * CONTENTS: Helper methods for test cases
 */

function commitCompare(method, compare, module_name, wait_time) {
	stop();
	setTimeout(function() {
		ok(!method(), "Commit "+ module_name);
		start();
		
		results = "data:" + pw.exportImage('image/jpeg').mimeType +";base64,"+pw.exportImage('image/jpeg').base64data;
		equals(results, compare.src, 'Canvas Output Successful');
	}, wait_time);
}

function applyCompare(method, compare, module_name, wait_time, x, y) {
	stop();
	setTimeout(function() {
		ok(!method(x,y), "Commit "+ module_name);
		start();
		
		results = "data:" + pw.exportImage('image/jpeg').mimeType +";base64,"+pw.exportImage('image/jpeg').base64data;
		equals(results, compare.src, 'Canvas Output Successful');
	}, wait_time);
}

function resetActionStack(method, module_name, wait_time) {
	stop();
	setTimeout(function() {
		ok(!method(), "Reset Action Stack via " + module_name);
		start();
	}, wait_time);
}

function deactivateModule(method, module_name, wait_time) {
	 stop();
	 setTimeout(function() {
	 	ok(!method(), "Deactivate " + module_name);
	 	//ok(!pw.undo(), "Reset Canvas");
		 start();
	 }, wait_time);
}

function resetCanvas(wait_time) {
	stop();
	 setTimeout(function() {
	 	ok(!pw.undo(), "Reset Canvas");
		 start();
	 }, wait_time);
}

function getImage(method, wait_time) {
	stop();
	setTimeout(function() {
		method();
		start();
		
		newImage.src = "data:image/jpeg;base64," + pw.exportImage('image/jpeg').base64data;
		console.log(newImage);
	}, wait_time);
}

function userDo(method, method_name, wait_time) {
	stop();
	setTimeout(function() {
		ok(!method(), ""+ method_name);
		start();
	}, wait_time);
}

function undo(wait_time) {
	stop();
		setTimeout(function() {
			pw.undo();
			start();
		}, wait_time);
}

function applyFlip(method, compare, module_name, wait_time, h, v, flatten) {
	stop();
	setTimeout(function() {
		ok(!method(h, v, flatten), "Called: " + module_name + " Flip");
		start();
		results = "data:" + pw.exportImage('image/jpeg').mimeType +";base64,"+pw.exportImage('image/jpeg').base64data;
		equals(results, compare.src, 'Canvas Output Successful');
	}, wait_time);
}

function completeReset(wait_time) {
	stop();
		setTimeout(function() {
			pw = new AV.PaintWidget(320,400);
			pw.setBackground(myImage);
			pw.currentLayerIndex = 0;
			start();
		}, wait_time);
}
