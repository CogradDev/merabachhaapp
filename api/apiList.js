export const server = 'https://cograd-erp-backend.onrender.com';

const apiList = {
  login: `${server}/parent/login`,
  getStudentInfo: studentId => `${server}/student/${studentId}`,
  fees: parentId => `${server}/parent/feesDetails/${parentId}`,
  attendance: studentId => `${server}/student/studentAttendance/${studentId}`,
  progressReport: studentId => `${server}/examResult/${studentId}`,

  //req = to register a complain, body(role, studentId, parentId, schoolId, audio)
  sendComplaint: `${server}/complains/register`,

  //req = parentId
  //res = all the complaints raised by parent (studentId, name, status of complain)
  getComplaints: parentId => `${server}/complains/parentComplain/${parentId}`,
  getNotifiactions: parentId => `${server}/notifications/${parentId}`,
};

export default apiList;
