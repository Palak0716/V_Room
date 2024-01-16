export const generateMeetingId = () => {
   let meetingID = "";
   const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
   const maxpos = chars.length;

   for (let i=0; i<8; i++){
      meetingID += chars.charAt(Math.floor(Math.random() * maxpos));
   }
   return meetingID;
}