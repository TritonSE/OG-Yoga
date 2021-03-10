//console.log("HELLLOOOO");

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/userInterface/getCalendar',
        success: function(result){
            let newEventList = [];
            for(i = 0; i < result.length; i++){
                //console.log(jobs[i]);
                const endTime = new Date(result[i].scheduled_time);
                const startDateTime = endTime.toISOString();
                endTime.setMinutes(endTime.getMinutes() + 60);
                const endDateTime = endTime.toISOString();
                const event = {
                    title: result[i].class_name,
                    start: startDateTime,
                    end: endDateTime
                }
                //console.log(event);
                newEventList.push(event);
                //console.log(newEventList);
                //document.getElementById('calendar').addEvent(event);
            }  
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'timeGridWeek',
                // dayGridMonth
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'addEventButton',
                    // center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                },
        
        
                editable: true,
                dayMaxEvents: true, // when too many events in a day, show the popover
                //events: 'https://fullcalendar.io/demo-events.json?overload-day',
                events: newEventList,
                customButtons: {
                    addEventButton: {
                        text: 'add event...',
                        click: function() {
                            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                            var date = new Date(dateStr + 'T00:00:00'); // will be in local time          
                            var titleStr = prompt('Enter a title');
                            if (!isNaN(date.valueOf())) { // valid?
                                calendar.addEvent({
                                    title: titleStr,
                                    start: date,
                                    allDay: true
                                });
                                alert('Great. Now, update your database...');
                            } else {
                                alert('Invalid date.');
                            }
                        }
                    }
                }
                // events: 'https://fullcalendar.io/demo-events.json'
            });
            calendar.render();
            //calendar.addEvent(newEventList[0]);
            //calendar.addEvent(newEventList[1]);
            //calendar.render();

        },
        error: function(err){
            console.error(err);
        }
    })
});