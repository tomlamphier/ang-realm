// sendcode - relay a verification code to the sendgrid email service
package main
import (
	"fmt"
	"log"
	"os"
	"net/http"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func main() {	
	fmt.Println("server started on port 5000")
	http.HandleFunc("/", handler)   // each request calls handler
	log.Fatal(http.ListenAndServe("0.0.0.0:5000", nil))
}

// handler echoes the path component of the URL
func handler(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	email  := ""
	code := ""
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if params["email"] != nil && len(params["email"]) > 0 {
		email = params["email"][0]
	}
	if params["code"] != nil && len(params["code"]) > 0 {
		code = params["code"][0]
	}
	if email != "" && code != "" {
		from := mail.NewEmail("Admin", "thomaslamphier@gmail.com")
		subject := "Your IndigoRiver Confirmation Code"
		to := mail.NewEmail("Example User", email)

		plainTextContent := fmt.Sprintf("Your confirm code is %s\n", code)
		htmlContent := ""
		message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
		client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
		response, err := client.Send(message)
		if err != nil {
			log.Println(err)
		        w.Write([]byte("Error sending confirm code"))
		} else {
			if response.StatusCode >= 200 && response.StatusCode < 300 {
				w.Write([]byte("OK"))
			} else {
				rc := fmt.Sprintf("%d", response.StatusCode)
				w.Write([]byte("Error sending confirm code: " + rc))

				fmt.Println(response.Body)
		                fmt.Println(response.Headers)
			}
		}
	}
}
