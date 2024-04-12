using System;
using System.Data;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace MancsÁllatmenhely
{
    public partial class Form1 : Form
    {
        public MySqlConnection connection;
        public string connectionString = "SERVER=localhost;DATABASE=mancsallatmenhely;UID=root;PASSWORD=;";

        public Form1()
        {
            InitializeComponent();
            ButtonLogin.Click += ButtonLogin_Click;
            DeleteButton.Click += DeleteButton_Click;
            InsertButton.Click += InsertButton_Click;

            connection = new MySqlConnection(connectionString);
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            panel2.Visible = false;
            LoadTableNames();
        }

        private void ButtonLogin_Click(object? sender, EventArgs e)
        {
            string username = textBoxUsername.Text;
            string password = textBoxPassword.Text;

            try
            {
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
                        panel2.Visible = true;
                        comboBox1.SelectedIndexChanged += comboBox1_SelectedIndexChanged;
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
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a bejelentkezés során: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }

        private void LoadTableData(string tableName)
        {
            try
            {
                connection.Open();
                string query = $"SELECT * FROM {tableName}";
                MySqlCommand cmd = new MySqlCommand(query, connection);
                MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                foreach (DataColumn column in dt.Columns)
                {
                    if (column.DataType == typeof(bool))
                    {
                        DataGridViewCheckBoxColumn checkBoxColumn = new DataGridViewCheckBoxColumn();
                        checkBoxColumn.HeaderText = column.ColumnName;
                        checkBoxColumn.Name = column.ColumnName;
                        checkBoxColumn.DataPropertyName = column.ColumnName;
                        dataGridView1.Columns.Add(checkBoxColumn);
                    }
                }

                dataGridView1.DataSource = dt;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatok betöltése során: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }


        private void LoadTableNames()
        {
            try
            {
                connection.Open();
                DataTable dt = connection.GetSchema("Tables");
                foreach (DataRow row in dt.Rows)
                {
                    string tableName = row["TABLE_NAME"].ToString() ?? "none";
                    comboBox1.Items.Add(tableName);

                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatbázis kapcsolódás során: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string? selectedTableName = comboBox1.SelectedItem != null ? comboBox1.SelectedItem.ToString() : "NONE";
            LoadTableData(selectedTableName);
        }

        private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                DataGridViewRow selectedRow = dataGridView1.Rows[e.RowIndex];
                string primaryKeyValue = selectedRow.Cells[0].Value.ToString();
                string columnName = dataGridView1.Columns[e.ColumnIndex].HeaderText;
                string cellValue = "";

                if (dataGridView1.Columns[e.ColumnIndex] is DataGridViewCheckBoxColumn)
                {
                    cellValue = (bool)selectedRow.Cells[e.ColumnIndex].Value ? "1" : "0";
                }
                else
                {
                    cellValue = selectedRow.Cells[e.ColumnIndex].Value.ToString();
                }
                try
                {
                    connection.Open();
                    string tableName = comboBox1.SelectedItem.ToString();
                    string query = $"UPDATE {tableName} SET {columnName} = '{cellValue}' WHERE {dataGridView1.Columns[0].HeaderText} = '{primaryKeyValue}'";
                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    int rowsAffected = cmd.ExecuteNonQuery();
                    MessageBox.Show($"{rowsAffected} rekord módosítva.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt az adatbázis frissítése során: " + ex.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        private void DeleteRecord(string tableName, string primaryKeyValue)
        {
            try
            {
                connection.Open();
                string query = $"DELETE FROM {tableName} WHERE {dataGridView1.Columns[0].HeaderText} = '{primaryKeyValue}'";
                MySqlCommand cmd = new MySqlCommand(query, connection);
                int rowsAffected = cmd.ExecuteNonQuery();
                MessageBox.Show($"{rowsAffected} rekord törölve.");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatbázis törlése során: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }
        private void InsertRecord(string tableName, string[] columnNames, string[] values)
        {
            try
            {
                connection.Open();
                string columns = string.Join(", ", columnNames);
                string valueParams = string.Join(", ", values.Select(v => $"'{v}'"));
                string query = $"INSERT INTO {tableName} ({columns}) VALUES ({valueParams})";
                MySqlCommand cmd = new MySqlCommand(query, connection);
                int rowsAffected = cmd.ExecuteNonQuery();
                MessageBox.Show($"{rowsAffected} rekord beszúrva.");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatbázis beszúrása során: " + ex.Message);
            }
            finally
            {
                connection.Close();
            }
        }
        private void DeleteButton_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                string primaryKeyValue = dataGridView1.CurrentRow.Cells[0].Value.ToString();
                string tableName = comboBox1.SelectedItem.ToString();
                DeleteRecord(tableName, primaryKeyValue);
                LoadTableData(tableName); 
            }
        }
        private void InsertButton_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                string tableName = comboBox1.SelectedItem.ToString();
                List<string> columnNames = new List<string>();
                List<string> values = new List<string>();

                foreach (DataGridViewCell cell in dataGridView1.CurrentRow.Cells)
                {
                    if (cell.Selected)
                    {
                        columnNames.Add(dataGridView1.Columns[cell.ColumnIndex].HeaderText);
                        values.Add(cell.Value.ToString());
                    }
                }

                InsertRecord(tableName, columnNames.ToArray(), values.ToArray());
                LoadTableData(tableName); 
            }
            else
            {
                MessageBox.Show("Válassz ki egy sort az adatok hozzáadásához!");
            }
        }



    }
}
