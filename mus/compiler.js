




var endTime = function (time, expr) {
    eti = function(expr)
    {
	// your code here
	if (expr.tag == 'note' || expr.tag == 'rest')
	    {
		return expr.dur;
	    }
   
	if (expr.tag == 'seq')
	    {
		return eti(expr.left) + eti(expr.right);
	    }
    };
    return time + eti(expr);
};




// maybe some helper functions

var compile = function (musexpr) {
    stack = [];
    stime = 0;
    ci = function(expr)
    {
        if (expr.tag == 'note' || expr.tag == 'rest')
	    {
		n = expr;
		n.start = stime;
           
		stime += expr.dur;
		stack.push(n);
	    }
       
        if (expr.tag == 'seq')
	    {
		ci(expr.left);
		ci(expr.right);
	    }
    };
       
    ci(musexpr);
    return stack;
};



// maybe some helper functions


var endTime = function (time, expr) {
    eti = function(expr)
    {
	// your code here
	if (expr.tag == 'note')
	    {
		return expr.dur;
	    }
  
	if (expr.tag == 'seq')
	    {
		return eti(expr.left) + eti(expr.right);
	    }
	if (expr.tag == 'par')
	    {
		ldur = eti(expr.left);
		rdur = eti(expr.right);
		return Math.max(ldur,rdur);
	    }
    };
    return time + eti(expr);
};




var compile = function (musexpr) {
    stack = [];
    stime = 0;
    ci = function(expr,ut)
    {
        if (expr.tag == 'note')
	    {
		n = expr;
		n.start = stime;
          
		if (ut)
		    {
			stime += expr.dur;
		    }
		stack.push(n);
	    }
      
        if (expr.tag == 'seq')
	    {
		ci(expr.left,true);
		ci(expr.right,true);
	    }
        if (expr.tag == 'par')
	    {
		ci(expr.left,false);
		ci(expr.right,false);
		stime+=endTime(0,expr);
	    }
    };
      
    ci(musexpr);
    return stack;
};

var melody_mus = 
{ tag: 'seq',
  left: 
  { tag: 'seq',
    left: { tag: 'note', pitch: 'a4', dur: 250 },
    right: { tag: 'note', pitch: 'b4', dur: 250 } },
  right:
  { tag: 'seq',
    left: { tag: 'note', pitch: 'c4', dur: 500 },
    right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));