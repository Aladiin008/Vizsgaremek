using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;
using MySql.Data.MySqlClient;


namespace Vizsgaremek
{
    public partial class Form1 : Form
    {
        private MySqlConnection connection;
        private string connectionString = "SERVER=localhost;DATABASE=mancsallatmenhely;UID=root;PASSWORD=;";


        public Form1()
        {
            InitializeComponent();
            InitializeDatabaseConnection();
            LoadTableNames();
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



        private void InitializeDatabaseConnection()
        {
            connection = new MySqlConnection(connectionString);
        }


        private void Form1_Load(object sender, EventArgs e)
        {
            comboBox1.Visible = false;
            dataGridView1.Visible = false;
        }


        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            string connectionString = "SERVER=localhost;DATABASE=mancsallatmenhely;UID=root;PASSWORD=;";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

                    string query = "SELECT * FROM Felhasznalok WHERE Email = @username AND Jelszo = @password ";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@username", textBox1.Text);
                    command.Parameters.AddWithValue("@password", textBox2.Text);

                    int userCount = Convert.ToInt32(command.ExecuteScalar());

                    if (userCount > 0)
                    {
                        panel1.Visible = false;
                        textBox1.Visible = false;
                        textBox2.Visible = false;
                        button1.Visible = false;
                        label1.Visible = false;
                        label2.Visible = false;
                        comboBox1.Visible = true;
                        dataGridView1.Visible = true;

                    }
                    else
                    {
                        MessageBox.Show("Hibás felhasználónév vagy jelszó!");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt a bejelentkezés során: " + ex.Message);
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

        
    }

}
