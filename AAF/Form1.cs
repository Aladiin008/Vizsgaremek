using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace Mancsallatmenhely
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            ButtonLogin.Click += ButtonLogin_Click;
        }

        private void ButtonLogin_Click(object sender, EventArgs e)
        {
            try
            {

                string username = textBoxUsername.Text;
                string password = textBoxPassword.Text;


                MySqlConnection connection = new MySqlConnection("server=localhost;user=root;password=;database=mancsallatmenhely;");

                connection.Open();


                string query = $"SELECT * FROM Felhasznalok WHERE FelhasznaloNev = '{username}' AND Jelszo = '{password}'";
                MySqlCommand cmd = new MySqlCommand(query, connection);
                MySqlDataReader reader = cmd.ExecuteReader();


                if (reader.Read())
                {

                    bool isAdmin = reader.GetBoolean("adminjogosultsag");
                    if (isAdmin)
                    {

                        MessageBox.Show("Sikeres bejelentkezés adminként!");
                        panel1.Visible = false;
                    }
                    else
                    {
                        MessageBox.Show("Sajnos nem rendelkezel admin jogosultsággal!");
                    }
                }
                else
                {

                    MessageBox.Show("Hibás felhasználónév vagy jelszó!");
                }
                connection.Close();
            } 
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
               
            }
            

        }

    }
}
