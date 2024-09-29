export const server = 'https://erp.cograd.in';
//export const server = 'http://192.168.31.73:8080';


const apiList = {
  login: `${server}/api/parent/login`,
  getStudentInfo: studentId => `${server}/api/student/${studentId}`,
  fees: parentId => `${server}/api/parent/feesDetails/${parentId}`,
  attendance: studentId => `${server}/api/student/studentAttendance/${studentId}`,
  progressReport: studentId => `${server}/api/examResult/${studentId}`,
  sendComplaint: `${server}/api/complains/register`,
  getComplaints: parentId => `${server}/api/complains/parentComplain/${parentId}`,
  getNotifications: parentId => `${server}/api/notifications/parent/${parentId}`,
};

export default apiList;
