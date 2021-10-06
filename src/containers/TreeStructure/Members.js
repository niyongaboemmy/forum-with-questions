import axios from 'axios';
import { API_URL } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

export const Members = async (coop_id, callback) => {
    try {
        // all the logics
        let male = 0;
        let female = 0;
        let member = [];
        setAuthToken();
        const res = await axios.get(`${API_URL}/members/coop/${coop_id}`);
        for(let i in res.data.data) {
            if (res.data.data[i].gender === "Male") {
                male += 1;
            } else {
                female += 1;
            }
            member.push({
                attributes: {
                    Gender: res.data.data[i].gender
                },
                name: res.data.data[i].fname,
                children: [
                    {
                        attributes: {
                            "": res.data.data[i].memberemail
                        },
                        name: "Contact"
                    }
                ]
            })
        }
        // return member;
        return callback(true, { male: male, female: female, data: member });
    } catch (error) {
      return callback(false, error);
    }
};