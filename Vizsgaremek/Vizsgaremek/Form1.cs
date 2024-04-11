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
using System.Data.SqlClient;

namespace Mancsallatmenhely
{
    public partial class Form1 : Form
    {
        private MySqlConnection connection;
        private string connectionString = "SERVER=localhost;DATABASE=mancsallatmenhely;UID=root;PASSWORD=;";
        public Form1()
        {
            InitializeDatabaseConnection();
            LoadTableNames();
            ButtonLogin.Click += ButtonLogin_Click;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            panel2.Visible = false;
        }

        private void ButtonLogin_Click(object sender, EventArgs e)
        {
            try
            {

                string username = textBox1.Text;
                string password = textBox2.Text;


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
                        panel2.Visible = true;
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


        private void InitializeDatabaseConnection()
        {
            connection = new MySqlConnection(connectionString);
        }

        private void LoadTableNames()
        {
            try
            {
                connection.Open();

                DataTable dt = connection.GetSchema("Tables");

                foreach (DataRow row in dt.Rows)
                {
                    string tableName = row["TABLE_NAME"].ToString();
                    comboBox1.Items.Add(tableName);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatbázis kapcsolódás során: " + ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        private void LoadTableData(string tableName)
        {
            try
            {
                connection.Open();

                string query = $"SELECT * FROM {tableName}";
                MySqlCommand cmd = new MySqlCommand(query, connection);

                DataTable dt = new DataTable();
                dt.Load(cmd.ExecuteReader());

                dataGridView1.DataSource = dt;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatok betöltése során: " + ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string selectedTableName = comboBox1.SelectedItem.ToString();
            LoadTableData(selectedTableName);
        }

        private Panel panel1;
        private TextBox textBox2;
        private TextBox textBox1;
        private Button ButtonLogin;

        

        private Panel panel2;
        private ComboBox comboBox1;
        private DataGridView dataGridView1;
    }
}
