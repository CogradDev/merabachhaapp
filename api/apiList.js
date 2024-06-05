export const server = 'https://cograd-erp-backend.onrender.com';

const apiList = {
  login: `${server}/parent/login`,

  //req = parents Id
  //res = list of childrens with info like (studentId, Name, schoolId, School, Class, Roll Number)
  getChilds: `${server}/parent/:parentId`,

  fees: parentId => `${server}/parent/feesDetails/${parentId}`,

  //req = studentId
  //res = attendance info
  attendance: studentId => `${server}/attendance/${studentId}`,

  //req = studentId
  //res = progress info of a particular students (subject, grade, suggestions)
  progressReport: studentId => `${server}/progress/${studentId}`,

  //req = to register a complain, body(role, studentId, parentId, schoolId, audio)
  sendComplaint: `${server}/complains/register`,

  //req = parentId
  //res = all the complaints raised by parent (studentId, name, status of complain)
  getComplaints: parentId => `${server}/complains/parentComplain/${parentId}`,

  getNotifiactions: parentId => `${server}/notifications/${parentId}`,
};

export default apiList;
