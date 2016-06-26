export function createTeacher() {
  
  return server.execute(function() {
    const TeacherFactory = require('/imports/domain/teacher-factory').default;
    
    return TeacherFactory.create();
  });
  
}