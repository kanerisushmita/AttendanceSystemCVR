

function showAttendance() {

    const data = JSON.parse(sessionStorage.getItem("attendance"));
    const students = data.present_students;
    for (var i = 0; i < students.length - 1; i++) {
        for (var j = students.length - 1; j > i; j--) {
            if (students[i] > students[j]) {
                var temp = students[i];
                students[i] = students[j];
                students[j] = temp;
            }
        }
    }

    var present_students = "";
    for ( i = 0; i < students.length; i++) {
        if (i !== students.length - 1)
            present_students += students[i] + ", ";
        else
            present_students += students[i];
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <table cellPadding={10} border={3} width="90%" style={{borderCollapse:"separate"}}>
                <thead style={{background:"#ddd"}}>
                    <tr>
                        <th>Subject</th>
                        <th>Professor Code</th>
                        <th>Class Code</th>
                        <th>Total Students</th>
                        <th>Strength of class</th>
                        <th>Present Students</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.subject}</td>
                        <td>{data.prof_code}</td>
                        <td>{data.class_code}</td>
                        <td>{data.students_count}</td>
                        <td>{data.present_students.length}</td>
                        <td>{present_students}</td>
                        <td>{data.createdAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default showAttendance;