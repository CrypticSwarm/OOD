OUTPUTING Request starting


Class: Request {#Request}
===============================

Make a (ajax) request.

### Syntax

	var myRequest = new Request([options]);

### public

Request Method: initialize {#Request:initialize}
----------------------------

The constructor

### Arguments

* options - (*Object (optional)*) Description



Class: Request.HTML {#Request.HTML}
===============================

Make a (ajax) request.

### Extends

* [Request][]

### Syntax

	var myRequest = new Request([options]);

### public

Request.HTML Method: initialize {#Request.HTML:initialize}
----------------------------

The constructor

### Arguments

* options - (*Object (optional)*) Description

### Exceptions

* (*Error*) description

### Returns

* (*Request.HTML*) A new Request.HTML instance


Request.HTML Method: stab {#Request.HTML:stab}
----------------------------

Returns the value of first non throwing function.

### Arguments

* ... - (*Function (required)*) Any number of Functions to call

### Returns

* (*Any*) The value of the first non throwing function.


Request.HTML Method: send {#Request.HTML:send}
----------------------------

send the request.

### Arguments

* options - (*Object (optional)*) Description


