export default function getDataFromURL() {
  const _url = window.location.pathname.split("/");
  return {
    teacherId: _url.pop(),
    studentName: _url.pop()
  }
}