export function createTeacher() {
  return server.execute(function() {
    const TeacherFactory = require('/imports/domain/teacher-factory').default;
    const TeacherRepository = require('/imports/domain/teacher-repository').default;

    const _teacher = TeacherFactory.create();
    const _teacherId = TeacherRepository.insert(_teacher);
    return TeacherRepository.get(_teacherId);
  });
}