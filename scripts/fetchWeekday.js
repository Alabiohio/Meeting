const weekdayUrl = "https://ohioalabi.github.io/Ohio/weekday.json";

const weekDate = document.getElementById('date');
const weekVerse = document.getElementById('verse');
const firstSong = document.getElementById('songNo1');
const chairMan = document.getElementById('chManName');
const firstTreasures = document.getElementById('tr1Title');
const firstTreasuresHandle = document.getElementById('tr1Handler');
const spiGems = document.getElementById('tr2');
const bibleReaders = document.getElementById('tr3Handler');
const bidleReadersText = document.getElementById('bReadText');
const secondSong = document.getElementById('songNo2');
const livingAsCh1Title = document.getElementById('lAC1Title');
const livingAsCh1Talk = document.getElementById('lAC1Talk');
const congBS = document.getElementById('congBHost');
const congBSReader = document.getElementById('congBReader');
const thirdSong = document.getElementById('songNo3');
const closePlayer = document.getElementById('clPrayer');
const chTime = document.getElementById('chTime');
const firstAssignmentBox = document.querySelector('#box2Cont1');
const secondAssignmentBox = document.querySelector('#box2Cont2');
const thirdAssignmentBox = document.querySelector('#box2Cont3');
const loadingBoxes = document.querySelectorAll('#box2Cont1, #box2Cont2, #box2Cont3');
const weeklySelect = document.querySelector('#selWeek');
const weeklySelect2 = document.querySelector('#selWeek2');

// Function to populate the meeting content
function populateMeetingContent(meetingData) {
    weeklySelect.textContent = `Select Week • ${meetingData.opening.mDateAbbr}`;
    weeklySelect2.textContent = `${meetingData.opening.mDateAbbr}`;
    weekDate.textContent = `${meetingData.opening.mDate}`;
    weekVerse.textContent = `${meetingData.opening.mVerse}`;
    firstSong.textContent = `${meetingData.opening.mSong1}`;
    chairMan.textContent = `${meetingData.opening.chairman}`;
    firstTreasures.textContent = `${meetingData.treasuresFGW.treasuresOne}`;
    firstTreasuresHandle.textContent = `${meetingData.treasuresFGW.treasuresOneHandler}`;
    spiGems.textContent = `${meetingData.treasuresFGW.spiritualGems}`;
    bibleReaders.textContent = `${meetingData.treasuresFGW.bibleReader}`;
    bidleReadersText.textContent = `${meetingData.treasuresFGW.bibleReaderText}`;

    firstAssignmentBox.innerHTML = `
        <span class="txt"><b id="assign_one">Starting a Conversation</b><br>
         <em id="timerOne">2 mins</em> <span id="assign_type">HOUSE TO HOUSE</span>
          </span><br><br>
            <span class="txt1"><b>—</b> <span id="student1">${meetingData.applyUrselfFM[0].assignedTo}</span><br>
            <b>House Holder: </b><span id="student3">${meetingData.applyUrselfFM[0].assignedHouseHolder}</span>     
    </span>`;
    
    secondAssignmentBox.innerHTML = `
        <span class="txt"><b id="assign_two">${meetingData.applyUrselfFM[1].assignHeading}</b><br>
         <em id="timerTwo">${meetingData.applyUrselfFM[1].assignTime}</em> <span id="assign_type2">${meetingData.applyUrselfFM[1].assignType}</span>
         </span><br><br>
          <span class="txt1"><b>—</b> <span id="student1i">${meetingData.applyUrselfFM[1].assignedTo}</span><br>
        <b>Partner:</b> <span id="student2i">${meetingData.applyUrselfFM[1].assignedPartner}</span><br>
      <b>House Holder: </b><span id="student3i">${meetingData.applyUrselfFM[1].assignedHouseHolder}</span>     
       </span>`;
    
    thirdAssignmentBox.innerHTML = `
              <span class="txt"><b>${meetingData.applyUrselfFM[2].assignHeading}</b><br> 
        <em>${meetingData.applyUrselfFM[2].assignTime}</em>
         <span id="assign_type3">${meetingData.applyUrselfFM[2].assignType}</span>
       </span><br><br>
       <span class="txt1"><b>—</b>${meetingData.applyUrselfFM[2].assignedTo}<br>
         <b>Partner:</b> ${meetingData.applyUrselfFM[2].assignedPartner}<br>
         <b>House Holder: </b> <span id="student3i">${meetingData.applyUrselfFM[2].assignedHouseHolder}</span>
       </span>`;
    
    secondSong.textContent = meetingData.livingAsCh.mSong2;
    livingAsCh1Title.textContent = meetingData.livingAsCh.lTalk1;
    chTime.textContent = meetingData.livingAsCh.lTalk1Time;
    livingAsCh1Talk.textContent = meetingData.livingAsCh.lTalk1Handler;
    congBS.textContent = meetingData.livingAsCh.congBsHandler;
    congBSReader.textContent = meetingData.livingAsCh.congBsReader;
    thirdSong.textContent = meetingData.closing.mSong3;
    closePlayer.textContent = meetingData.closing.cPrayer;
}

// Function to fetch meeting data
async function weekdayMeetingRequest() {
    try {
        loadingBoxes.forEach(box => {
            box.innerHTML = `<div class='text-center isLoading'>
                <span class='spinner-border spinLoad' role='status'></span>
            </div>`;
        });

        let response = await fetch(weekdayUrl);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        let meetingData = await response.json();
        sessionStorage.setItem("meetingData", JSON.stringify(meetingData)); // Store data in sessionStorage
        populateMeetingContent(meetingData);
    } catch (error) {
        console.error("Couldn't update meeting:", error.message);
    }
}

// Function to check for saved data in sessionStorage
function loadFromSessionStorage() {
    let storedData = sessionStorage.getItem("meetingData");
    if (storedData) {
        populateMeetingContent(JSON.parse(storedData));
    } else {
        weekdayMeetingRequest(); // Fetch data if not available
    }
}

// On page load, check sessionStorage
loadFromSessionStorage();

// Internet status monitoring
let internetStatusInterval = null;

function checkInternetStatus() {
    if (navigator.onLine) {
        weekdayMeetingRequest();
        clearInterval(internetStatusInterval);
        internetStatusInterval = null;
    } else {
        if (!internetStatusInterval) {
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

window.addEventListener("online", checkInternetStatus);
window.addEventListener("offline", checkInternetStatus);

