
// Simple UUID generator alternative
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const generateMeeting = async (
  title,
  scheduledDate,
  duration = 60
) => {
  try {
    // Generate unique meeting room name for Jit.si
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const meetingId = `skillswap-${timestamp}-${randomStr}`;
    
    // Create Jit.si meeting room URL
    // Jit.si allows any room name, rooms are created instantly when accessed
    const meetingLink = `https://meet.jit.si/${meetingId}`;
    const joinLink = `${meetingLink}#config.startWithAudioMuted=true&config.startWithVideoMuted=false`;
    
    // Add meeting title and participants info to URL
    const encodedTitle = encodeURIComponent(title);
    const meetingLinkWithTitle = `${meetingLink}#config.roomPassword=&config.subject=${encodedTitle}`;

    return {
      meetingId,
      meetingLink: meetingLinkWithTitle,
      joinLink,
      password: undefined 
    };
  } catch (error) {
    console.error('Error generating Jit.si meeting:', error);
    throw new Error('Failed to generate meeting link');
  }
};

export const generateZoomMeeting = async (
  title,
  scheduledDate,
  duration = 60
) => {
  //Mock
  return generateMeeting(title, scheduledDate, duration);
};

export const generateGoogleMeetMeeting = async (
  title,
  scheduledDate,
  duration = 60
) => {
  //Mock
  return generateMeeting(title, scheduledDate, duration);
};