function onFormSubmit(e)
{
  // Retrieve values based on their question text
  var name = e.namedValues["Requester Name"]
  var email = e.namedValues["Email Address"]
  var time = e.namedValues["Timestamp"]
  var client_name = e.namedValues["Client Name"]
  var form = FormApp.openById('example id')
  var formResponses = form.getResponses()
  var number_of_responses = formResponses.length
  Logger.log(number_of_responses)
  
  let options = { year: 'numeric', month: 'long', day: 'numeric' };

  var msgHtml = "Hello " + name + ","
        + "<p>" + "This is a confirmation message to let you know we received your request for " + client_name + ". You will receive a reply to this email once a team member has picked up the request. \n" + "\n"+ "Please see below the request we have recieved from you: \n" + "</p>"
        + "<p>" + "<b>Client</b>: " + e.namedValues["Client name"].toString() + "</p>"
        + "<p>" + "<b>Volume:</b> " + e.namedValues["Amount requested"].toString() + "</p>"
        
        + "<p>" + "Kind regards," + "<br>" + "Sales Support Team" + "</p>";

    var msgPlain = msgHtml.replace(/(<([^>]+)>)/ig, "");

  var recipient = email + ", sales_support@example_comapany.com,"
  var subject = "Sales Support Request Confirmation: " + client_name + " (Request ID = " + number_of_responses + ")"

// Option 1 -  Send from your gmail account
GmailApp.sendEmail(recipient, subject, message)

// Option 2 - Send email from an alternative address
GmailApp.sendEmail(recipient, subject, msgPlain, 
{ bcc: "", htmlBody: msgHtml, from: "sales_support@example_comapany.com",name: "Sales Support Team" })

  
}


function test_onFormSubmit() {
  var NUMBER_OF_TESTS = 1;
  var dataRange = SpreadsheetApp.getActiveSheet().getDataRange();
  var data = dataRange.getValues();
  var headers = data[0];
  // Start at row 1, skipping headers in row 0
  for (var row=1; row <= NUMBER_OF_TESTS; row++) {
    var e = {};
    e.values = data[row].filter(Boolean);  
    e.range = dataRange.offset(row,0,1,data[0].length);
    e.namedValues = {};
    // Loop through headers to create namedValues object
    // NOTE: all namedValues are arrays.
    for (var col=0; col<headers.length; col++) {
      e.namedValues[headers[col]] = [data[row][col]];
    }
    // Pass the simulated event to onFormSubmit
    onFormSubmit(e);
  }
}

function test_row_number() {
  var NUMBER_OF_TESTS = 1;
  var dataRange = SpreadsheetApp.getActiveSheet().getDataRange();
  var data = dataRange.getValues();
  var headers = data[0];
  // Start at row 1, skipping headers in row 0
  for (var row=1; row <= NUMBER_OF_TESTS; row++) {
    var e = {};
    e.values = data[row].filter(Boolean);  
    e.range = dataRange.offset(row,0,1,data[0].length);
    e.namedValues = {};
    // Loop through headers to create namedValues object
    // NOTE: all namedValues are arrays.
    for (var col=0; col<headers.length; col++) {
      e.namedValues[headers[col]] = [data[row][col]];
    }
    
    Logger.log(e.values)
  }
}
