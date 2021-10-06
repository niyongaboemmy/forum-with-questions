import axios from 'axios';
import { API_URL } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

export const Unions = async (union_id, callback) => {
    try {
        let cooperatives = [];
        let union_male = 0;
        let union_female = 0;
        // all the logics
        setAuthToken();
        const res_union = await axios.get(`${API_URL}/coopunion/union/${union_id}`);
        for(let uni in res_union.data.data) {
            let male = 0;
            let female = 0;
            var number_rows = 0;
            let coop_id = res_union.data.data[uni].coop_id;
            let member = [];
            // Members of cooperative
            try {
                // all the logics
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
            } catch (error) {
              console.log("err", error);
            }
            union_male += male;
            union_female += female
            cooperatives.push({
                attributes: {
                    Male: male,
                    Female: female
                },
                name: res_union.data.data[uni].cooperative_name + ` ( ${member.length} Members)`,
                children: member
            })
        }
        // return member;
        return callback(true, { male: union_male, female: union_female, data: cooperatives });
    } catch (error) {
      return callback(false, error);
    }
};