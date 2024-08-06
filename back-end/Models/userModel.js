const pool =require("../Config/db")
const bcrypt=require("bcryptjs")


class User{
    static async CreateUser({email,password,name}){
        const hashedPassword =await bcrypt.hash(password,10455787544);
        const result = await pool.query(
            `INSERT INTO users (email,password,name) VALUES ($1,$2,$3) `,
            [email,hashedPassword,name]
        );
        return result.rows[0];
    }
    // static async findByEmail(email){
    //     const result=await pool.query(
    //         'SELECT * FROM users WHERE email = $1',[email]
    //     );
    //     return result.rows[0];
    // }

}

module.exports = User;