export const server = 'https://cograd-erp-backend.onrender.com';
//export const server = 'http://192.168.31.73:8080';


const apiList = {
  login: `${server}/parent/login`,
  getStudentInfo: studentId => `${server}/student/${studentId}`,
  fees: parentId => `${server}/parent/feesDetails/${parentId}`,
  attendance: studentId => `${server}/student/studentAttendance/${studentId}`,
  progressReport: studentId => `${server}/examResult/${studentId}`,
  sendComplaint: `${server}/complains/register`,
  getComplaints: parentId => `${server}/complains/parentComplain/${parentId}`,
  getNotifications: parentId => `${server}/notifications/parent/${parentId}`,
};

export default apiList;
