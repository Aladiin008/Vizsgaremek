using System;
using System.Data;
using System.Windows.Forms;
using MySql.Data.MySqlClient;


namespace Vizsgaremek
{
    public partial class Form1 : Form
    {
        MySqlConnection connection;
        MySqlCommand cmd;
        MySqlDataAdapter adapter;
        DataTable table;

        public Form1()
        {
            InitializeComponent();
            InitializeDatabaseConnection();
        }

        private void InitializeDatabaseConnection()
        {
            
            
        }


        private void Form1_Load(object sender, EventArgs e)
        {
            DisplayTable("allatok");
        }

        private void DisplayTable(string tableName)
        {
            
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
    }
    
}
