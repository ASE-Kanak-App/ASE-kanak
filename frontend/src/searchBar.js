import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, List } from "antd";
import axios from "axios";

const { Search } = Input;

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value) => {
        setLoading(true);
        setSearchTerm(value);
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/auth/search/${value}`
            );
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <Search
                placeholder="Search Users"
                allowClear
                enterButton="Search"
                size="large"
                loading={loading}
                onSearch={handleSearch}
            />
            {users.length > 0 && (
                <List
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 1,
                        width: "100%",
                    }}
                    bordered
                    dataSource={users}
                    renderItem={(user) => (
                        <List.Item style={{background: 'white'}}>
                            <Link to={`/user/${user.id}`}>{user.username}</Link>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default SearchBar;
