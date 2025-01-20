//const weekdayUrl = "http://192.168.43.1:8080/Dynamic/weekday.json";
//const weekdayUrl = "http://192.168.122.53:8080/Dynamic/weekday.json";
const weekdayUrl = "https://ohioalabi.github.io/Ohio/weekday.json"

const weekDate = document.getElementById('date');
const weekVerse = document.getElementById('verse');
const firstSong = document.getElementById('songNo1');
const chairMan = document.getElementById('chManName');
//TREASURES
const firstTreasures = document.getElementById('tr1Title');
const firstTreasuresHandle = document.getElementById('tr1Handler');
//const weekDate = document.getElementById('date'); PROPOSED FOR IMAGE
const spiGems = document.getElementById('tr2');
const bibleReaders = document.getElementById('tr3Handler');
const bidleReadersText = document.getElementById('bReadText');
//APPLY YOURSELF TO MINISTRY
const secondSong = document.getElementById('songNo2');
const livingAsCh1Title = document.getElementById('lAC1Title');
const livingAsCh1Talk = document.getElementById('lAC1Talk');
const congBS = document.getElementById('congBHost');
const congBSReader= document.getElementById('congBReader');
const thirdSong = document.getElementById('songNo3');
const closePlayer = document.getElementById('clPrayer');
const chTime = document.getElementById('chTime');

/*const secondAssignmentType = document.getElementById('assign_type2');
const secondAssignmentHandler = document.getElementById('student1');
const secondAssignmentPartner= document.getElementById('student2');
const secondAssignmentHH= document.getElementById('student3');
*/
const firstAssignmentBox = document.querySelector('#box2Cont1');
const secondAssignmentBox = document.querySelector('#box2Cont2');
const thirdAssignmentBox = document.querySelector('#box2Cont3');

const loadingBoxes = document.querySelectorAll('#box2Cont1, #box2Cont2, #box2Cont3');
const weeklySelect = document.querySelector('#selWeek');
const weeklySelect2 = document.querySelector('#selWeek2');

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function weekdayMeetingRequest() {
    try {
      
      loadingBoxes.forEach(loadingBoxes => {
      loadingBoxes.innerHTML = "<div class='text-center isLoading'><span class='spinner-border spinLoad' role='status'></span></div>";
      });
      
        await delay(5000);
        
        let weekdayResponse = await fetch(weekdayUrl);
        if (!weekdayResponse.ok) {
            throw new Error(`HTTP error: ${weekdayResponse.status}`);
        }
        let weekdayMeeting = await weekdayResponse.json();
      
       selWeek.textContent=`Select Week • ${weekdayMeeting.opening.mDateAbbr}`;
       selWeek2.textContent=`${weekdayMeeting.opening.mDateAbbr}`;
        date.textContent=`${weekdayMeeting.opening.mDate}`;
        verse.textContent=`${weekdayMeeting.opening.mVerse}`;
        firstSong.textContent=`${weekdayMeeting.opening.mSong1}`;
        chairMan.textContent=`${weekdayMeeting.opening.chairman}`;
        
        tr1Title.textContent=`${weekdayMeeting.treasuresFGW.treasuresOne}`;
        tr1Handler.textContent=`${weekdayMeeting.treasuresFGW.treasuresOneHandler}`;
        //SPACE FOR THE IMG
        tr2Handler.textContent=`${weekdayMeeting.treasuresFGW.spiritualGems}`;
        tr3Handler.textContent=`${weekdayMeeting.treasuresFGW.bibleReader}`;
        bReadText.textContent=`${weekdayMeeting.treasuresFGW.bibleReaderText}`;

        firstAssignmentBox.innerHTML = `
        <span class="txt"><b id="assign_one">Starting a Conversanion</b><br>
         <em id="timerOne">2 mins</em> <span id="assign_type">HOUSE TO HOUSE</span>
          </span>  <br> <br>
            <span class="txt1"><b>—</b> <span id="student1">${weekdayMeeting.applyUrselfFM[0].assignedTo}</span><br>
        <!--<b>Partner:</b> <span id="student2">${weekdayMeeting.applyUrselfFM[0].assignedPartner}</span><br>-->
      <b>House Holder: </b><span id="student3">${weekdayMeeting.applyUrselfFM[0].assignedHouseHolder}</span>     
    </span> <div class="space h5" id="sp">space</div>
        `;
        
        secondAssignmentBox.innerHTML = `
        <span class="txt"><b id="assign_two">${weekdayMeeting.applyUrselfFM[1].assignHeading}</b><br>
         <em id="timerTwo">${weekdayMeeting.applyUrselfFM[1].assignTime}</em> <span id="assign_type2">${weekdayMeeting.applyUrselfFM[1].assignType}</span>
         </span>  <br><br>
          <span class="txt1"><b>—</b> <span id="student1i">${weekdayMeeting.applyUrselfFM[1].assignedTo}</span><br>
        <b>Partner:</b> <span id="student2i"> ${weekdayMeeting.applyUrselfFM[1].assignedPartner}</span><br>
      <b>House Holder: </b><span id="student3i">${weekdayMeeting.applyUrselfFM[1].assignedHouseHelder}</span>     
       </span>
        `;
        
        thirdAssignmentBox.innerHTML = `
              <span class="txt"><b>${weekdayMeeting.applyUrselfFM[2].assignHeading}</b><br> 
        <em>${weekdayMeeting.applyUrselfFM[2].assignTime}</em>
         <span id="assign_type3">${weekdayMeeting.applyUrselfFM[2].assignType}</span>
       </span>  <br><br>
       <span class="txt1"><b>—</b>${weekdayMeeting.applyUrselfFM[2].assignedTo}<br>
         <b>Partner:</b> ${weekdayMeeting.applyUrselfFM[2].assignedPartner}<br>
         <b>House Holder: </b> <span id="student3i">${weekdayMeeting.applyUrselfFM[2].assignedHouseHolder}</span>
       </span>
        `;
      
      songNo2.textContent = weekdayMeeting.livingAsCh.mSong2;
      lAC1Title.textContent = weekdayMeeting.livingAsCh.lTalk1;
      chTime.textContent = weekdayMeeting.livingAsCh.lTalk1Time;
      lAC1Talk.textContent = weekdayMeeting.livingAsCh.lTalk1Handler;
      congBHost.textContent = weekdayMeeting.livingAsCh.congBsHandler;
      congBReader.textContent = weekdayMeeting.livingAsCh.congBsReader;
      
      songNo3.textContent = weekdayMeeting.closing.mSong3;
      clPrayer.textContent = weekdayMeeting.closing.cPrayer;
      
      
    } catch (error) {
        console.error("Couldn't update meeting:", error.message);
    } 
    
}





let internetStatusInterval = null;

function checkInternetStatus() {
    if (navigator.onLine) {
      weekdayMeetingRequest();
      clearInterval(internetStatusInterval); // Stop the interval when online
        internetStatusInterval = null; // Reset the interval variable
    } else {
             if (!internetStatusInterval) {
            // Start an interval to keep checking when offline
            internetStatusInterval = setInterval(() => {
              if (navigator.onLine) {
                  weekdayMeetingRequest();
                    clearInterval(internetStatusInterval);
                    internetStatusInterval = null;
                }
            }, 5000);
        }
    }
}

// Listen for online/offline events for immediate response
window.addEventListener("online", checkInternetStatus);
window.addEventListener("offline", checkInternetStatus);

// Initial check when the script runs
checkInternetStatus();    

    