using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class Role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d60958ef-4ecd-4850-8b6b-d6b8d0591a59", "37122c06-8c9b-41de-b0f6-a878f685ff8a", "Manager", "MANAGER" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "262aeca8-e523-478d-bd07-1bd851f756c5", "053d6069-7885-4ac1-85b4-4df0e178265c", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "262aeca8-e523-478d-bd07-1bd851f756c5");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "d60958ef-4ecd-4850-8b6b-d6b8d0591a59");
        }
    }
}
