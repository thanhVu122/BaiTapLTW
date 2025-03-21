import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://67db9eba1fd9e43fe4752efd.mockapi.io/User/GetUser";

const UserList = () => {
    const [getUser, setUser] = useState([]);
    const [name, setName] = useState(""); // Ô nhập Name
    const [mssv, setMssv] = useState(""); // Ô nhập MSSV
    const [editId, setEditId] = useState(null); // ID user đang sửa
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setUser(response.data))
            .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
    }, []);

    const btnXoa = (id) => {
        if (window.confirm("Ban co muon xoa khong ?")) {
            axios.delete(`${API_URL}/${id}`).
                then(() => {
                    alert("Xoa thanh cong");
                    setUser(getUser.filter(user => user.id !== id))
                }).catch(error => console.error("Loi khi xoa", error))
        }
    };

    const btnThem = () => {
        if (!name || !mssv) {
            alert("Vui long nhap du thong tin");
            return;
        }
        else {
            const newUser = { Name: name, Mssv: mssv };
            axios.post(API_URL, newUser)
                .then(response => {
                    setUser([...getUser, response.data]);
                    setName = "";
                    setMssv = "";
                    alert("Them thanh cong");
                })
                .catch(error => console.error("Lỗi khi thêm user:", error));
        }
    };

    const handleEdit = (user) => {
        setEditId(user.id); // Lưu ID của user cần sửa
        setName(user.Name); // Hiển thị tên vào input
        setMssv(user.Mssv); // Hiển thị MSSV vào input
    };

    const btnSua = () => {
        if (!name || !mssv) {
            alert("Vui long nhap du thong tin");
            return;
        }
        else {
            axios.put(`${API_URL}/${editId}`, { Name: name, Mssv: mssv })
                .then(response => {
                    setUser(getUser.map(user => user.id == editId ? response.data : user));
                    setEditId(null);
                    setName("");
                    setMssv("");
                    alert("Cap nhat thanh cong");

                })

                .catch(error => console.error("Lỗi khi cập nhật user:", error));

        }
    }

    return (
        
        <div>
            <h2> Nhóm 4- Sáng thưs 6</h2>
            {/* Ô nhập thông tin */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Nhập tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nhập MSSV"
                    value={mssv}
                    onChange={(e) => setMssv(e.target.value)}
                />
                <button onClick={btnThem}>Thêm User</button>
                <button onClick={btnSua}>Cập nhật User</button>
            </div>

            <div className="danhSach">
                <h2>Danh sách Users</h2>
                <table border="1" >
                    <thead>
                        <tr >
                            <th >ID</th>
                            <th >Họ và Tên</th>
                            <th >Mã Số Sinh Viên</th>
                            <th > Tac vụ </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getUser.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.Name}</td>
                                <td>{user.Mssv}</td>
                                <td>
                                    <button href="#" onClick={() => btnXoa(user.id)}>Xóa</button> /
                                    <button href="#" onClick={() => handleEdit(user)}>Sửa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserList;
